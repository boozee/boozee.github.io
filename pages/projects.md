---
title: Projects
layout: default
permalink: /projects/
---

<div class="tabs">
  <button class="tab-button active" data-tab="personal">Personal</button>
  <button class="tab-button" data-tab="contributor">Contributor</button>
</div>

<div class="tab-content is-active" id="personal">
  <section>
    <div class="grid grid-3">
      {% assign personal_projects = site.data.projects | where: "category", "personal" %}
      {% for p in personal_projects %}
        {% include card-project.html project=p %}
      {% endfor %}
    </div>
  </section>
</div>

<div class="tab-content" id="contributor">
  <section>
    <div class="grid grid-3">
      {% assign contributor_projects = site.data.projects | where: "category", "contributor" %}
      {% for p in contributor_projects %}
        {% include card-project.html project=p %}
      {% endfor %}
    </div>
  </section>
</div>
