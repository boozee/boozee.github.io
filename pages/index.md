---
title: Home
layout: default
permalink: /
---

<section class="hero">
  <div class="grid grid-2">
    <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
      <div>
        <h1>Hello, I'm {{ site.data.cv.name }}</h1>
        <p class="muted">{{ site.data.cv.role }} · {{ site.data.cv.location }}</p>
        <p>{{ site.data.cv.summary }}</p>
        <div>
          {% for s in site.data.cv.skills_summary %}
          <span class="badge">{{ s }}</span>
          {% endfor %}
        </div>
      </div>
    </div>

    <div class="card contact-card">
	  <img src="{{ site.baseurl }}/assets/img/profile.png"
		   alt="Photo of {{ site.data.cv.name }}"
		   class="profile-img">

	  <h3>Contact</h3>
	  <table class="table">
		<tr><th>Email</th><td><a href="mailto:{{ site.data.cv.email }}">{{ site.data.cv.email }}</a></td></tr>
		{% for link in site.data.cv.links %}
		<tr><th>{{ link.label }}</th><td><a href="{{ link.url }}">{{ link.url }}</a></td></tr>
		{% endfor %}
	  </table>
	</div>
  </div>
</section>

<hr/>

<section>
  {% include section-heading.html title="Projects" subtitle="A few highlights" %}
  <div class="grid grid-3">
    {% for p in site.data.projects %}
      {% include card-project.html project=p %}
    {% endfor %}
  </div>
</section>
