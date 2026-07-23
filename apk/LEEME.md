# Shifter Pro — APK para Android

La app es un solo archivo: `index.html` en la raiz del repositorio.
Este directorio la empaqueta como aplicacion Android usando **Capacitor**.

El APK se compila **en GitHub** (no hace falta instalar Android Studio ni Java
en tu computadora).

---

## Como generar el APK

1. Sube estos cambios a GitHub (rama `main`).
2. Entra a tu repositorio → pestana **Actions**.
3. Elige el flujo **"Construir APK Android"** → boton **Run workflow**.
4. Espera ~5 minutos.
5. Cuando termine, abre la ejecucion y descarga el artefacto **ShifterPro-APK**.
   Dentro esta `ShifterPro-v24-debug.apk`.

Tambien se genera solo cada vez que cambias `index.html` en `main`.

## Como instalarlo en el telefono

1. Pasa el `.apk` al telefono (cable, Drive, WhatsApp, etc.).
2. Abrelo. Android pedira permiso para **instalar apps de origenes desconocidos**:
   acepta para tu explorador de archivos.
3. Listo. Queda como una app normal, con su icono.

> Es un APK **de depuracion** (debug): sirve para instalarlo tu mismo y repartirlo
> directamente. Para publicarlo en Google Play hace falta un APK/AAB *firmado*
> con tu propia clave.

---

## Estructura

| Archivo | Para que sirve |
|---|---|
| `capacitor.config.json` | Nombre de la app, id (`sv.jaffet.shifterpro`) y color de fondo |
| `package.json` | Dependencias de Capacitor |
| `scripts/copy-app.js` | Copia `index.html` de la raiz a `www/` antes de compilar |
| `www/` | Contenedor web que se empaqueta dentro del APK |

La carpeta `android/` y `node_modules/` **no** se suben al repo: se generan
durante la compilacion.

## Para cambiar el nombre o el icono

- **Nombre / id**: edita `appName` y `appId` en `capacitor.config.json`.
- **Icono**: tras `npx cap add android`, reemplaza las imagenes en
  `android/app/src/main/res/mipmap-*/`.

---

## La version web

El flujo **"Publicar en GitHub Pages"** despliega `index.html` automaticamente.
Para activarlo la primera vez: repositorio → **Settings → Pages → Source: GitHub Actions**.

Quedara publicada en:
`https://jaffetsv.github.io/calendarioturnos/`
