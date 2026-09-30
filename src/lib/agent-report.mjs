export const sourceNames = { techmeme: 'Techmeme', hn: 'Hacker News', smol: 'AINews', latent: 'Latent Space' };
export function escape(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
export function safeUrl(value) {
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? escape(url.href) : '#';
  } catch { return '#'; }
}
const link = (url, title) => `<a href="${safeUrl(url)}" target="_blank" rel="noopener noreferrer">${escape(title)}</a>`;
export function observationText(o) {
  if (o.source === 'hn') return `Top 100 position ${o.rank} · ${o.votes} HN votes · ${o.comments} comments`;
  if (o.source === 'techmeme') return `Main headline · page position ${o.rank}`;
  return 'Selected specialist editorial publication';
}
export function storyMarkup(s, lead = false) {
  const tag = lead ? 'h2' : 'h3';
  const rows = [['Editorial selection', s.breakdown.editorial], ['Developer attention', s.breakdown.community], ['Distinct source agreement', s.breakdown.agreement], ['Repeat prominence', s.breakdown.persistence]];
  return `<article class="${lead ? 'lead' : 'story'}" data-story="${escape(s.id)}"><${tag}>${link(s.url, s.headline)}</${tag}><details class="story-details"><summary><strong>${escape(s.points)} points</strong> · Details</summary><div class="detail-body"><p class="category">${escape(s.category)} · ${escape(s.publisher)}</p>${s.fact ? `<p>${escape(s.fact)}</p>` : ''}<p class="check">${s.headline_status === 'ai_checked' ? 'Customized headline' : 'Source headline'} · ${escape(s.check_note)}</p><p class="evidence-heading">Why this ranks</p><ul>${s.observations.map(o => `<li>${link(o.observed_url, sourceNames[o.source] || o.source)}: ${escape(observationText(o))}<br><time datetime="${escape(o.observed_at)}">Observed ${escape(o.observed_at.replace('T',' ').replace('Z',' UTC'))}</time></li>`).join('')}</ul><table><tbody>${rows.map(([name, points]) => `<tr><th scope="row">${escape(name)}</th><td>${escape(points)}</td></tr>`).join('')}</tbody></table><p class="check">Seen in ${escape(s.seen_windows)} refresh window${s.seen_windows === 1 ? '' : 's'}. Priority points represent observed attention, not proven real-world impact.</p>${s.coverage.length > 1 ? `<p class="evidence-heading">Related coverage</p><ul>${s.coverage.map(c => `<li>${link(c.url, c.title)}</li>`).join('')}</ul>` : ''}</div></details></article>`;
}
export function renderStories(stories) {
  if (!stories.length) return '<p class="empty">No stories match this view.</p>';
  return storyMarkup(stories[0], true) + `<div class="stories">${stories.slice(1).map(s => storyMarkup(s)).join('')}</div>`;
}
export function renderHealth(edition) {
  return `<ul>${edition.source_health.map(h => `<li><strong>${escape(sourceNames[h.source] || h.source)}</strong>: ${escape(h.status === 'ok' ? 'collected' : h.status === 'stale' ? 'no fresh articles in the seven-day window' : 'unavailable this refresh')} · ${escape(h.count)} candidates${h.newest_article_at ? ` · latest article ${escape(h.newest_article_at.slice(0,10))}` : ''}</li>`).join('')}</ul>`;
}
export function validEdition(data) {
  try {
    return data?.version === 1 && Number.isFinite(Date.parse(data.generated_at)) && Array.isArray(data.source_health) && Array.isArray(data.stories) && data.stories.length > 0 && data.stories.length <= 100 && data.stories.every(s => typeof s.headline === 'string' && s.headline.length <= 500 && Number.isFinite(s.points) && s.breakdown && Array.isArray(s.observations) && s.observations.every(o => typeof o.observed_at === 'string') && Array.isArray(s.coverage) && ['http:', 'https:'].includes(new URL(s.url).protocol));
  } catch { return false; }
}
