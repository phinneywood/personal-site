import bootstrap from '../../../agent-report/bootstrap.json';
export function GET() {
  return new Response(JSON.stringify(bootstrap), {headers:{'Content-Type':'application/json'}});
}
