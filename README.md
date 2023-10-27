# Duplo Platform service 

I have followed the instructions outlined in the requirement document and made an effort to address the sample payload for logging orders with the tax authority system. The payload contains a platform code property, yet there is no clear guidance provided on how to obtain it. My assumption is that this platform code serves as the unique identifier obtained during the enrollment process on the Duplo platform within the Taxpayer's system, and it should be included in every request when transmitting order details.

## Problems identified  

- As mentioned in the Product Requirements Document (PRD), the API's performance may vary, and consequently, responses from the government API can occasionally exhibit delays, with response times ranging from 15 to 35 seconds.
    
## Implemented solution for the above problem. 

I have implemented a Retry Mechanism to address the occasional delays in API responses. This mechanism incorporates exponential backoff, which automatically resend the request after a delay, ensuring that the API eventually returns the data. While this approach has resolved the issue, I've also considered the potential for other undesirable behaviors, such as continuous failures, which could result in a poor user experience. In this context, I've integrated the Circuit Breaker pattern as a prudent strategy when dealing with remote API calls, particularly in situations where the API might encounter timeouts, failures, or high latency. The Circuit Breaker pattern is a valuable addition that enhances the application's resilience by preventing repeated attempts to access an unreliable or failing third-party service. This contributes to an overall improvement in the application's reliability and performance.


## Tools used
- Node.js
- TypeScript
- TypeOrm
- MongoDB
- Jest
- Docker

## API Endpoint
| Methods   | Endpoints                                     | 
|---------  |-----------------------------------------------|
| POST      | /api/v1/orders                                | 
| GET       | /api/v1/business/:businessId/credit-score     | 
| GET       | /api/v1/business/:businessId/order-summary    | 


## Running the Application

```shell
Development:        pnpm run dev

Build:              pnpm run build

Production:         pnpm start

Testing:            pnpm run test

Test coverage:      pnpm run test:coverage
```

## Docker

```shell
docker-compose up
```

```shell
Deployed Docker Image: https://hub.docker.com/r/akeren/duplo-credit-score-service-credit-score-api/tags
```
## Further Enhancement

- A service access restriction will be put in place to ensure that only authorized clients can access the system. This will be implemented at the infrastructure level through the creation of a mechanism that enables backend services to communicate exclusively via their internal DNS URLs. Additionally, IP whitelisting will be applied for third-party services, specifically the Taxpayer's service, to further enhance security and ensure that only approved IP addresses are permitted to access the system.

- End to end writing of unit and integration test cases









