---
title: Skills
layout: default
permalink: /skills/
---

{% include section-heading.html title="Skills" %}
<div class="grid grid-2">
  {% for cat in site.data.skills %}
    <div class="card">
      <h3>{{ cat.category }}</h3>
      <div>
        <div class="chips">
        {% for it in cat.items %}
          <span class="badge tech-badge">{{ it }}</span>
        {% endfor %}
        </div>
      </div>
    </div>
  {% endfor %}
</div>
