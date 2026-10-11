"""Stage docs/brann as a multi-file artifact: the overview becomes the main page (no document wrapper)."""
import re,pathlib,shutil,sys
root=pathlib.Path(__file__).resolve().parents[2]; src=root/"docs/brann"; out=pathlib.Path(sys.argv[1]); out.mkdir(parents=True,exist_ok=True)
t=(src/"index.html").read_text()
head=re.search(r"<head>(.*?)</head>",t,re.S).group(1); body=re.search(r"<body>(.*?)</body>",t,re.S).group(1)
head=re.sub(r'<meta (charset|name="viewport")[^>]*>\n?',"",head)
(out/"main.html").write_text(head.strip()+"\n"+body.strip()+"\n")
for f in ["board.html","free-agents.html","prospects.html","lower-tiers.html","report.html","assets/site.css","assets/core.js","data/players.json","data/meta.json"]:
    (out/f).parent.mkdir(parents=True,exist_ok=True); shutil.copy(src/f,out/f)
print("staged",out)
