import { PostHog } from 'posthog-node';
import {
  NODE_ENV,
  POSTHOG_HOST,
  POSTHOG_PROJECT_API_KEY,
  TELEMETRY_ENABLED
} from '../config';
import { getLogger } from '../utils/logger';

if(!TELEMETRY_ENABLED){
  getLogger("backend-main").info([
    "",
    "To improve, Infisical collects telemetry data about general usage.",
    "This helps us understand how the product is doing and guide our product development to create the best possible platform; it also helps us demonstrate growth as we support Infisical as open-source software.",
    "To opt into telemetry, you can set `TELEMETRY_ENABLED=true` within the environment variables.",
  ].join('\n'))
}

let postHogClient: any;
if (NODE_ENV === 'production' && TELEMETRY_ENABLED) {
  // case: enable opt-out telemetry in production
  postHogClient = new PostHog(POSTHOG_PROJECT_API_KEY, {
    host: POSTHOG_HOST
  });
}

export default postHogClient;
