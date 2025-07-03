#!/bin/sh

# Reemplazar $PORT en la configuración de nginx
envsubst '$PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Iniciar nginx
nginx -g 'daemon off;' 