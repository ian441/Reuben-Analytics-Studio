// Portfolio content loading from Contentful
// Fill in your own Contentful credentials below.

(function () {
  'use strict';

  // TODO: replace these with your actual Contentful values
  var CONTENTFUL_SPACE_ID = '';
  var CONTENTFUL_ENVIRONMENT_ID = 'master'; // usually "master" unless you created another env
  var CONTENTFUL_DELIVERY_TOKEN = '';

  var CONTENT_TYPE_ID = 'project'; // the ID of your "Project" content type

  function buildUrl() {
    if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_DELIVERY_TOKEN) return null;
    var base = 'https://cdn.contentful.com/spaces/' +
      encodeURIComponent(CONTENTFUL_SPACE_ID) +
      '/environments/' +
      encodeURIComponent(CONTENTFUL_ENVIRONMENT_ID) +
      '/entries';
    var params = [
      'content_type=' + encodeURIComponent(CONTENT_TYPE_ID),
      'order=fields.order,sys.createdAt'
    ];
    return base + '?' + params.join('&');
  }

  function createProjectCard(project) {
    var fields = project.fields || {};
    var tag = fields.tag || '';
    var title = fields.title || '';
    var description = fields.description || '';
    var outcome = fields.outcome || '';
    var tools = Array.isArray(fields.tools) ? fields.tools : [];
    var imageLabel = fields.imageLabel || '';

    var article = document.createElement('article');
    article.className = 'portfolio-card reveal';

    var imageDiv = document.createElement('div');
    imageDiv.className = 'portfolio-card-image';
    imageDiv.setAttribute('aria-hidden', 'true');
    if (imageLabel) {
      imageDiv.style.setProperty('--card-label', "'" + imageLabel.replace(/'/g, "\\'") + "'");
    }

    var body = document.createElement('div');
    body.className = 'portfolio-card-body';

    if (tag) {
      var tagDiv = document.createElement('div');
      tagDiv.className = 'portfolio-card-tag';
      tagDiv.textContent = tag;
      body.appendChild(tagDiv);
    }

    if (title) {
      var h3 = document.createElement('h3');
      h3.textContent = title;
      body.appendChild(h3);
    }

    if (description) {
      var p = document.createElement('p');
      p.className = 'portfolio-card-desc';
      p.textContent = description;
      body.appendChild(p);
    }

    if (outcome) {
      var outcomeDiv = document.createElement('div');
      outcomeDiv.className = 'portfolio-card-outcome';
      outcomeDiv.textContent = outcome;
      body.appendChild(outcomeDiv);
    }

    if (tools.length) {
      var toolsDiv = document.createElement('div');
      toolsDiv.className = 'portfolio-card-tools';
      tools.forEach(function (tool) {
        var span = document.createElement('span');
        span.textContent = tool;
        toolsDiv.appendChild(span);
      });
      body.appendChild(toolsDiv);
    }

    article.appendChild(imageDiv);
    article.appendChild(body);
    return article;
  }

  function renderProjects(projects) {
    var grid = document.querySelector('.portfolio-grid');
    if (!grid) return;

    grid.innerHTML = '';

    if (!projects.length) {
      var empty = document.createElement('p');
      empty.textContent = 'Portfolio projects will appear here once added in Contentful.';
      empty.style.textAlign = 'center';
      grid.appendChild(empty);
      return;
    }

    projects.forEach(function (project, index) {
      var card = createProjectCard(project);
      card.classList.add('reveal-delay-' + ((index % 3) + 1));
      grid.appendChild(card);
    });
  }

  function loadProjects() {
    var url = buildUrl();
    if (!url) return;

    var grid = document.querySelector('.portfolio-grid');
    if (!grid) return;

    var loading = document.createElement('p');
    loading.textContent = 'Loading projects...';
    loading.style.textAlign = 'center';
    grid.innerHTML = '';
    grid.appendChild(loading);

    fetch(url, {
      headers: {
        Authorization: 'Bearer ' + CONTENTFUL_DELIVERY_TOKEN
      }
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (!data || !Array.isArray(data.items)) {
          throw new Error('Invalid response from Contentful');
        }
        renderProjects(data.items);
      })
      .catch(function () {
        loading.textContent = 'Unable to load projects right now.';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProjects);
  } else {
    loadProjects();
  }
})();

