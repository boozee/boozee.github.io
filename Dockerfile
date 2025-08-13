# Use official Jekyll image
FROM jekyll/jekyll:latest

# Install dependencies from Gemfile
COPY Gemfile .
RUN bundle install

# Expose ports
EXPOSE 4000
EXPOSE 35729

# Default command (same as docker-compose)
CMD ["jekyll", "serve", "--livereload", "--force_polling", "--host", "0.0.0.0"]
