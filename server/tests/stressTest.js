import http from 'k6/http';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errorRate')

export default function () {
  const getRand = (min, max) => Math.floor(Math.random() * (max - min) + min);
  const res = http.get(`http://localhost:8000/api/product/${getRand(1, 10000000)}`);

  errorRate.add(res.status >= 400);
}

export let options = {
    // reduce load on test machine and prduce more reliable results
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'ramping-arrival-rate',
      startRate: 1,
      timeUnit: '1s',
      preAllocatedVUs: 100,
      maxVUs: 500,
      stages: [
        { target: 10, duration: '60s' },
        { target: 100, duration: '60s' },
        { target: 500, duration: '60s' },
      ]
    }
  }
};