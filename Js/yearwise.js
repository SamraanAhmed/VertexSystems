document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('virus-list');
  if (!list) return;
  const items = Array.from(list.querySelectorAll('li.virus'));
  const searchEl = document.getElementById('search');
  const yearEl = document.getElementById('filter-year');
  const sortEl = document.getElementById('sort');
  const countEl = document.getElementById('list-count');

  function normalize(str) {
    return (str || '').toString().toLowerCase().trim();
  }

  function render(filtered) {
    list.innerHTML = '';
    filtered.forEach(li => list.appendChild(li));
    if (countEl) countEl.textContent = `${filtered.length} shown`;
  }

  function apply() {
    const q = normalize(searchEl && searchEl.value);
    const year = yearEl ? yearEl.value : 'all';
    const sort = sortEl ? sortEl.value : 'deaths-desc';

    let filtered = items.filter(li => {
      const name = normalize(li.getAttribute('data-name'));
      const matchesName = !q || name.includes(q);
      const liYear = (li.getAttribute('data-year') || '').toString();
      const matchesYear = year === 'all' || liYear === year;
      return matchesName && matchesYear;
    });

    filtered.sort((a, b) => {
      const nameA = a.getAttribute('data-name') || '';
      const nameB = b.getAttribute('data-name') || '';
      const deathsA = Number(a.getAttribute('data-deaths')) || 0;
      const deathsB = Number(b.getAttribute('data-deaths')) || 0;

      switch (sort) {
        case 'deaths-asc':
          return deathsA - deathsB;
        case 'name-asc':
          return nameA.localeCompare(nameB);
        case 'name-desc':
          return nameB.localeCompare(nameA);
        case 'deaths-desc':
        default:
          return deathsB - deathsA;
      }
    });

    render(filtered);
  }

  ['input', 'change'].forEach(evt => {
    if (searchEl) searchEl.addEventListener(evt, apply);
    if (yearEl) yearEl.addEventListener(evt, apply);
    if (sortEl) sortEl.addEventListener(evt, apply);
  });

  apply();
});
