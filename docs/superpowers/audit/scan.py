import re,glob,os,collections,sys
S=os.path.dirname(os.path.abspath(__file__))
PAT={'emdash':r'—','endash':r'–','semicolon':r';','middot':r'·','bar':r' \| ','arrow':r'[→←↗↘➔»]',
'notXY':r"\b(?:it'?s|this is|that'?s|is) not\b[^.]*,|\bnot (?:just|only|a|an|the)\b[^.]*\b(?:but|it'?s)\b|\b(?:isn'?t|aren'?t|wasn'?t)\b[^.]{0,40}[.,] (?:it'?s|they'?re|it was)\b|\. Not \w",
'hedge':r'\b(?:roughly|approximately|nearly|around \d|about \d|~\d|arguably|perhaps|somewhat|kind of|sort of)\b|~\d',
'buzz':r'\b(?:actually|honestly|honest|seamless(?:ly)?|leverage|unlock|elevate|robust|delve|journey|game[- ]chang\w*|empower\w*|supercharge\w*|cutting[- ]edge|world[- ]class|next[- ]level|no spin|no fluff|no BS|simply|effortless\w*|transform\w*|revolution\w*|in today\'s)\b',
'ellipsis':r'…|\.\.\.'}
lines=collections.defaultdict(set)
for f in sorted(glob.glob(S+'/text/*.txt')):
    page=os.path.basename(f)[:-4]
    for ln in open(f).read().splitlines():
        ln=ln.strip()
        if ln.startswith(('URL:','STATUS:')) or not ln: continue
        for k,p in PAT.items():
            if re.search(p,ln,re.I if k in('notXY','hedge','buzz') else 0): lines[(k,ln[:220])].add(page)
cnt=collections.Counter(k for k,_ in lines)
print(cnt)
for (k,ln),pg in sorted(lines.items()):
    if len(sys.argv)<2 or k in sys.argv[1:]: print(f'[{k}] ({len(pg)}: {",".join(sorted(pg))[:60]}) {ln}')
