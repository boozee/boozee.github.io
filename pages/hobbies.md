---
title: Hobbies
layout: default
permalink: /hobbies/
---

{% include section-heading.html title="Hobbies" %}
<div class="grid grid-2">
  {% for h in site.data.hobbies.hobbies %}
    <div class="card">
      <svg width="26" height="26" class="icon hobby-icon">
        <use xlink:href="#{{ h.icon }}"></use>
      </svg>
      <h3>{{ h.title }}</h3>
      <p style="white-space: pre-line;">{{ h.blurb }}</p>
    </div>
  {% endfor %}
</div>
