/* 
usage guide:
run by issuing `docker-compose run --rm k6 run /scripts/ci.js` command

this script should normally run for 30s
but it will wait for remaining requests and VUs to finish so it might take much more time

first 10s will have 10 VUs
second 10s 20VUs will be added
third 10s no VUs will be added

in average 90% of request must have response time less than 200ms
and 95% of request must have response time less than 300ms

every second it will try to fire 2 requests
one for base url
one for a page between ["/blog/","/help/","/this-does-not-exist/"]
these paths include a url that does not exists in reallity
just to make the scenario more real

the script will only check if the requests response status is 200

*/

import http from "k6/http";
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: "10s", target: 10 },
    { duration: "10s", target: 20 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(90)<200", "p(95)<300"],
    // "http_req_duration{what:home}": [{
    //   thresholds: "p(95)<100",
    //   abortOnFail: true,
    //   delayAbortEval: "10s",
    // }],
  }
};

export default function () {
  const pages = [
    "/blog/",
    "/help/",
    "/this-does-not-exist/",
  ]
  for (const page of pages) {
    const resHome = http.get(
      "https://chista.ir",
      // {tags: {what: "home"}}
      );
    check(resHome, {
      "status was 200": (r) => r.status == 200,
    });
    const resPage = http.get("https://chista.ir" + page);
    check(resPage, {
      "status was 200": (r) => r.status == 200,
    });
    sleep(1);
  }
}
