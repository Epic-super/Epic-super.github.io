package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strings"
)

var (
	// For HTML: finds href="..." and src="..." attributes.
	htmlRegex = regexp.MustCompile(`(?:href|src)="([^"]+)"`)
	// For JS: finds relative imports like from './module.js'.
	jsRegex = regexp.MustCompile(`from\s+['"]((?:\./|\.\./)[^"']+\.js)['"]`)
	// For CSS: finds url(...) declarations for common font types.
	cssRegex = regexp.MustCompile(`url\(['"]?([^'")]+(\.(?:woff|woff2|ttf|otf|eot|svg)))['"]?\)`)
	// For manifest.json: finds "src": "..." and "start_url": "..."
	jsonRegex = regexp.MustCompile(`"(?:start_url|src)":\s*"([^"]+)"`)
)

func main() {
	startFile := "index.html"
	if _, err := os.Stat(startFile); os.IsNotExist(err) {
		fmt.Fprintf(os.Stderr, "Error: %s not found. Please run in your project's root directory.\n", startFile)
		os.Exit(1)
	}

	queue := []string{startFile}
	discovered := map[string]bool{startFile: true}

	for len(queue) > 0 {
		currentFile := queue[0]
		queue = queue[1:]

		content, err := ioutil.ReadFile(currentFile)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Warning: could not read file %s, skipping.\n", currentFile)
			continue
		}

		baseDir := filepath.Dir(currentFile)
		fileExt := filepath.Ext(currentFile)

		var re *regexp.Regexp
		switch fileExt {
		case ".html":
			re = htmlRegex
		case ".js":
			re = jsRegex
		case ".css":
			re = cssRegex
		case ".json":
			re = jsonRegex
		default:
			continue // Skip other file types
		}
		findDependencies(string(content), baseDir, re, &queue, discovered)
	}

	printCacheList(discovered)
}

func findDependencies(content, baseDir string, re *regexp.Regexp, queue *[]string, discovered map[string]bool) {
	matches := re.FindAllStringSubmatch(content, -1)
	for _, match := range matches {
		if len(match) < 2 {
			continue
		}
		depPath := match[1]

		if strings.HasPrefix(depPath, "http") || strings.HasPrefix(depPath, "data:") {
			continue
		}

		cleanPath := filepath.Clean(filepath.Join(baseDir, depPath))

		if _, exists := discovered[cleanPath]; !exists {
			if _, err := os.Stat(cleanPath); err == nil {
				discovered[cleanPath] = true
				*queue = append(*queue, cleanPath)
			}
		}
	}
}

func printCacheList(fileSet map[string]bool) {
	var fileList []string
	for file := range fileSet {
		fileList = append(fileList, file)
	}
	sort.Strings(fileList)

	fmt.Println("const CACHE_FILES = [")
	for _, file := range fileList {
		// Use forward slashes for web compatibility
		fmt.Printf("  './%s',\n", filepath.ToSlash(file))
	}
	fmt.Println("];")
}