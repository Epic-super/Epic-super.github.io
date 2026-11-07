# HTML Mental Rotation Test

A lightweight, client-side implementation of the classic Mental Rotation Test for measuring spatial ability, built with HTML, CSS, and Three.js.

## Overview

This repository contains a web-based implementation of the Mental Rotation Test (MRT), a well-established cognitive assessment tool used in psychological research to measure spatial visualization ability. Originally developed by Shepard and Metzler (1971), the MRT has been widely used in cognitive psychology and neuroscience research.

This implementation:
- Runs entirely in the browser with no server-side dependencies
- Uses Three.js for real-time 3D rendering
- Features four different 3D object types
- Provides randomized trials with controlled difficulty
- Records accuracy and response time metrics
- Preserves privacy by keeping all data client-side

## Features

- **Privacy-preserving**: All testing occurs locally in the browser without sending data to any server
- **Randomized trials**: Each test session presents unique rotations and object configurations
- **Multiple object types**: Features four distinct 3D objects with varying complexity
- **Performance metrics**: Measures both accuracy and response time
- **Responsive design**: Adapts to different screen sizes
- **Simple UI**: Clear instructions and intuitive controls

## How It Works

The test presents participants with 10 trials. In each trial:

1. Two 3D objects are displayed side by side
2. The left object is the reference (with a small rotation to show it's 3D)
3. The right object is either:
   - The same object but rotated (50% of trials)
   - A mirror image of the object, also rotated (50% of trials)
4. Participants must determine if the objects are the same or different
5. The test records accuracy and response time for each trial

## Usage

### For Researchers

1. Clone this repository to your local machine or web server
2. Open `mental-rotation-test.html` in a web browser
3. Use as is, or modify parameters in the JavaScript section to adjust:
   - Number of trials
   - Types of shapes
   - Rotation angles
   - Visual appearance

### For Participants

1. Click the "Start Test" button and read the instructions
2. For each trial, examine both 3D objects
3. Click "Same" if you believe the right object is identical to the left but rotated
4. Click "Different" if you believe the objects are mirror images of each other
5. Complete all 10 trials to see your results
6. Results show your accuracy percentage and average response time

## Technical Details

### Dependencies

- [Three.js](https://threejs.org/) (r128) - Loaded via CDN

### Key Components

- **3D Object Generation**: Four parametrically defined 3D shapes with distinct features
- **Randomization**: Pseudorandom selection of shape type, rotation angles, and same/different condition
- **Rotation Logic**: Systematic application of rotation matrices to create controlled difficulty
- **Timing System**: High-precision performance timing using the Performance API
- **Results Analysis**: Basic statistical computation of accuracy and response time metrics

## Research Applications

This implementation can be used for:

- Cognitive psychology experiments investigating spatial ability
- Educational assessment of spatial reasoning skills
- Neuroscience research on mental rotation and spatial processing
- Training and development of spatial visualization abilities

## Customization

The implementation can be easily customized by modifying the JavaScript:

- Adjust the `totalTrials` variable to change test length
- Modify the shape generation functions to create new object types
- Change rotation parameters to adjust difficulty
- Customize the UI appearance via CSS

## References

- Shepard, R. N., & Metzler, J. (1971). Mental rotation of three-dimensional objects. *Science*, 171(3972), 701-703.
- Peters, M., & Battista, C. (2008). Applications of mental rotation figures of the Shepard and Metzler type and description of a mental rotation stimulus library. *Brain and Cognition*, 66(3), 260-264.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions to improve the implementation are welcome. Please feel free to submit a pull request or open an issue to discuss potential changes or enhancements.
