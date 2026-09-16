---
date: 2026-09-16T11:15
tags: []
cssclasses:
  - page-blueprint
  - page-grid
---
---
## Key Characteristics of Distributed Systems

### 1. Scalability
---
Scalability is the capability of a system, process or a network to grow and manage increased demand. Any distributed system that can continuously evolve in order to support the growing amount of work is considered to be scalable. 

==**Horizontal vs. Vertical Scaling**==: Horizontal Scaling means that you scale by adding more servers into your pool of resources whereas Vertical scaling means that you scale by adding more power CPU, RAM etc. to an existing server. 

With horizontal-scaling it is often easier to scale dynamically by adding more machines into the existing pool; Vertical-scaling is usually limited to the capacity of a single server and scaling beyond that capacity often involves downtime and comes with an upper limit.

Good examples of horizontal scaling are [Cassandra](https://en.wikipedia.org/wiki/Apache_Cassandra) and [MongoDB](https://en.wikipedia.org/wiki/MongoDB) as they both provide an easy way to scale horizontally by adding more machines to meet growing needs. Similarly, a good example of vertical scaling is MySQL as it allows for an easy way to scale vertically by switching from smaller to bigger machines. However, this process often involves downtime.

![[1-202609161115.png]]

### 2. Reliability 
---


