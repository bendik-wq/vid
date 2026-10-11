"""Render the markdown report and longlists into docs/brann/report.html."""
import markdown,re,pathlib
root=pathlib.Path(__file__).resolve().parents[2]
md=lambda p: markdown.markdown((root/p).read_text(),extensions=["tables","sane_lists"])
body=md("scouting/sk-brann-scouting-report-2026.md")+'<hr><h1 id="longlists" style="font-size:40px">Regional longlists</h1>'+re.sub(r"^<h1>.*?</h1>","",md("scouting/regional-longlists.md"),count=1,flags=re.S)
body=re.sub(r"^<h1>.*?</h1>","",body,count=1,flags=re.S)
body=body.replace("<table>",'<div class="tbl-wrap"><table>').replace("</table>","</table></div>")
body=re.sub(r'<a href="(https?://[^"]+)">',r'<a href="\1" target="_blank" rel="noopener">',body)
page=f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Brann Scouting Report</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22%3E%3Ccircle cx=%228%22 cy=%228%22 r=%227%22 fill=%22%23c8102e%22/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Public+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="assets/site.css">
</head>
<body>
<div class="wrap">
<header class="page-head">
  <div class="lede">
    <span class="eyebrow">Written report · January and summer 2027 windows</span>
    <h1>Scouting report</h1>
    <p>The full written report: Brann's squad and game model, the five priority signings with data, the model results, budget and plan, and the regional longlists. Data cut-off 10–11 October 2026.</p>
  </div>
</header>
<article class="prose">
{body}
</article>
</div>
<script src="assets/core.js"></script>
<script>B.nav();</script>
</body>
</html>
'''
(root/"docs/brann/report.html").write_text(page)
print("report.html",len(page)//1024,"KB")
