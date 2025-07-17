# Development
Pasos para levantar la app en desarrollo

1. levantar la base de datos
```
docker compose up -d
```

2. Renombrar el .env.template a .env
3. Reemplazar las variables de entorno
4. Ejecutar el SEED para agregar datos iniciales a la DB [http://localhost:3000/api/seed]

## Nota: Usuario por defecto
_email:_ jsmith.o@gmail.com
_password:_ 123456

# Prisma commands
```
npx prisma init 
npx prisma migrate dev
npx prisma generate
```


# Stage
