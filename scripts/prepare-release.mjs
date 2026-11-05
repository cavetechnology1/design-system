// Local artifacts only: never tags, uploads, publishes or deploys.
import {execFileSync} from 'node:child_process';
import {readFile,writeFile,mkdir,readdir,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
const root=new URL('../',import.meta.url).pathname;
const version=JSON.parse(await readFile(path.join(root,'package.json'),'utf8')).version;
if(!version.includes('beta'))throw Error('Expected a beta website version');
await stat(path.join(root,'dist/flutter-preview/main.dart.js'));
const out=path.join(root,'.artifacts/releases',`v${version}`);await mkdir(out,{recursive:true});
const walk=async dir=>{const files=[];for(const entry of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);files.push(...entry.isDirectory()?await walk(p):[p]);}return files;};
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const files=[];
for(const file of (await walk(path.join(root,'dist'))).sort())files.push({path:path.relative(path.join(root,'dist'),file),sha256:sha(await readFile(file)),bytes:(await stat(file)).size});
await writeFile(path.join(out,'website-files.json'),JSON.stringify(files,null,2)+'\n');
const zip=path.join(out,`cave-ui-website-${version}.zip`);
execFileSync('python3',['-c',`import pathlib,sys,zipfile
root=pathlib.Path(sys.argv[1])
with zipfile.ZipFile(sys.argv[2],'w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted(root.rglob('*')):
  if p.is_file():
   info=zipfile.ZipInfo(str(p.relative_to(root)),date_time=(2026,11,5,0,0,0))
   info.compress_type=zipfile.ZIP_DEFLATED
   info.external_attr=0o100644 << 16
   z.writestr(info,p.read_bytes())`,path.join(root,'dist'),zip]);
const checks=[];
for(const file of [zip,path.join(out,'website-files.json')])checks.push(`${sha(await readFile(file))}  ${path.basename(file)}`);
await writeFile(path.join(out,'SHA256SUMS.txt'),checks.join('\n')+'\n');
const candidate={version,commit:execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),sourceDirty:!!execFileSync('git',['status','--porcelain'],{cwd:root,encoding:'utf8'}).trim(),hostingProject:'cave-design-system',hostingSite:'cave-design-system',domain:'design.cave.technology',files:files.length,publication:'held pending advance owner notice'};
await writeFile(path.join(out,'candidate.json'),JSON.stringify(candidate,null,2)+'\n');
console.log(JSON.stringify({directory:out,...candidate,checksums:checks},null,2));
