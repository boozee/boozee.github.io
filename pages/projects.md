---
title: Projects
layout: default
permalink: /projects/
---

<section>
  <div class="grid grid-3">
    {% for p in site.data.projects %}
      {% include card-project.html project=p %}
    {% endfor %}
  </div>
</section>