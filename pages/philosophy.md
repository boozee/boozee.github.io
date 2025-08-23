---
title: Working Philosophy
layout: default
permalink: /philosophy/
description: Principles and ways of working I use to deliver clear, maintainable software with predictable outcomes.
---

<div class="tab-content is-active">
  <div class="cv-card-list">
    {% assign sections = site.data.philosophy.sections %}
    {% for s in sections %}
      {% include philosophy-section.html s=s %}
    {% endfor %}
  </div>
</div>