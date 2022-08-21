# k6 in docker

### before use

> `docker network create k6`

### k6 dashboard setup

then in the `k6-dashboard` directory hit:

> `docker-compose up -d`

then if it throws permission error in the root directory hit:

> `sudo chmod -R 777 k6-dashboard`

### k6 client setup

then in the `k6-client` directory hit:

> `docker-compose run --rm k6 run /scripts/*name of the script file*.js`

### grafana setup

so far you sould be able to make requests to your configured domain,

in order to connect grafana to consume influxdb go to `grafana>settings>datasource` and add the influxdb as it will appear in the dropdown

next create your dashboards and enjoy :)