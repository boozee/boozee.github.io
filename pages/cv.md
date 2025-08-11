---
title: CV
layout: default
permalink: /cv/
---

{% include section-heading.html title="Experience" %}
<div class="grid">
  {% for e in site.data.cv.experience %}
    <div class="card">
      <h3>{{ e.role }} — {{ e.company }}</h3>
      <div class="muted">{{ e.start }} – {{ e.end | default: "present" }}</div>
      <ul>
        {% for b in e.bullets %}
          <li>{{ b }}</li>
        {% endfor %}
      </ul>
    </div>
  {% endfor %}
</div>

{% include section-heading.html title="Education" %}
<div class="grid">
  {% for edu in site.data.cv.education %}
    <div class="card">
      <h3>{{ edu.degree }}</h3>
      <div class="muted">{{ edu.school }} — {{ edu.year }}</div>
    </div>
  {% endfor %}
</div>
