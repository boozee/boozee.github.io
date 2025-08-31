# Use a specific, stable version of the official Ruby image
FROM ruby:3.1.4-alpine

# Install build-essential for compiling gems, and libc6-compat for native extensions
RUN apk add --no-cache build-essential libc6-compat

# Set the working directory
WORKDIR /srv/jekyll

# Copy only the Gemfiles to leverage Docker layer caching
COPY Gemfile Gemfile.lock ./

# Configure Bundler to install gems locally and ensure it has enough jobs
RUN bundle config set --local path 'vendor/bundle' && \
    bundle config set --local jobs 4 && \
    bundle install

# Copy the rest of your application code
COPY . .

# Expose the Jekyll port
EXPOSE 4000

# The final command to run the server, using bundle exec to ensure correct gem versions
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0"]