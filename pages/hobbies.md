---
title: Hobbies
layout: default
permalink: /hobbies/
---

{% include section-heading.html title="Hobbies" %}
<div class="grid grid-2">
  {% for h in site.data.hobbies %}
    <div class="card">
      <h3>{{ h.title }}</h3>
      <p>{{ h.blurb }}</p>
    </div>
  {% endfor %}
</div>
