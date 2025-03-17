To address your request, I’ll update the `supervisord.conf` file so that the Stable Diffusion WebUI runs on port 7860, as you’ve specified that the `nginx.conf` proxies `localhost:7860` to port 7861. Below, I’ll provide all the Docker-related files, with the necessary change made to `supervisord.conf`. The other files (`Dockerfile`, `post_start.sh`, and `app.conf`) remain unchanged based on the requirement, but I’ll include them for completeness.

Your query suggests that the WebUI should listen on `localhost:7860`, and Nginx is configured to handle external requests, likely listening on port 7861 and proxying them to `localhost:7860`. To achieve this, we’ll configure the WebUI to use `--port 7860` in `supervisord.conf` without the `--listen` flag, ensuring it binds to `localhost:7860`.

Here are the complete updated Docker-related files:

---

### `dockerfile`
*Unchanged* - This file sets up the environment, installs dependencies, and exposes ports 4444 and 7861. The exposed port 7861 aligns with external access via Nginx, while the WebUI runs internally on 7860.
