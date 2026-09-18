#!/usr/bin/env bash
# 拉取红莉栖官方反应语音(44/45 条 OGG)到 amadeus/voices/
# 来源与上游 rafiqxin/amadeus-pet 的 tools/fetch-voices.mjs 一致(rafiqxin/Amadeus 的 raw 资源)
# 版权素材，不入库(gitignore 已排除 amadeus/voices/)，本地/各端播放用。用法：bash amadeus/fetch-voices.sh
set -u
BASE="https://raw.githubusercontent.com/rafiqxin/Amadeus/master/app/src/main/res/raw"
DIR="$(cd "$(dirname "$0")" && pwd)/voices"
mkdir -p "$DIR"
CLIPS="hello daga_kotowaru devilish_pervert i_guess nice pervert_confirmed sorry sounds_tough \
this_guy_hopeless christina gah dont_add_tina why_christina who_the_hell_christina ask_me_whatever \
could_i_help what_do_you_want what_is_it heheh huh_why_say you_sure nice_to_meet_okabe \
look_forward_to_working senpai_question senpai_questionmark senpai_what_we_talkin senpai_who_is_this \
senpai_please_dont_tell still_not_happy dont_call_me_like_that tm_nonsense tm_scientist_no_evidence \
tm_we_dont_know tm_you_said humans_software memory_complex secret_diary \
modifying_memories_impossible memories_christina gah_extended should_christina ok tm_not_possible \
pleased_to_meet_you pervert_idot_wanttodie"
ok=0; fail=0
for n in $CLIPS; do
  f="$DIR/$n.ogg"
  if [ -s "$f" ]; then ok=$((ok+1)); continue; fi
  if curl -s --max-time 30 -o "$f" "$BASE/$n.ogg" && [ -s "$f" ]; then
    printf '  ok   %s\n' "$n"; ok=$((ok+1))
  else
    printf '  FAIL %s\n' "$n"; rm -f "$f"; fail=$((fail+1))
  fi
done
echo "done: $ok ok, $fail failed -> $DIR"