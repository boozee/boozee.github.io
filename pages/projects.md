---
title: Projects
layout: default
permalink: /projects/
---

{% include section-heading.html title="Projects" %}
<div class="grid grid-3">
  {% for p in site.data.projects %}
    {% include card-project.html project=p %}
  {% endfor %}
</div>
