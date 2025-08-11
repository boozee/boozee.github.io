---
title: Projects
layout: default
permalink: /projects/
---

<section>
  {% include section-heading.html title="All Projects" subtitle="Full list" %}
  <div class="grid grid-3">
    {% for p in site.data.projects %}
      {% include card-project.html project=p %}
    {% endfor %}
  </div>
</section>