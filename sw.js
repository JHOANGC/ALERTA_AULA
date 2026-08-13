// Firebase Messaging: muestra la notificacion aunque la app este cerrada
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");
 
firebase.initializeApp({
  apiKey: "AIzaSyDGkoqh8ecgv2dSJU0RKzCAdSvV3WpM-t8",
  authDomain: "alerta-aula.firebaseapp.com",
  databaseURL: "https://alerta-aula-default-rtdb.firebaseio.com",
  projectId: "alerta-aula",
  storageBucket: "alerta-aula.firebasestorage.app",
  messagingSenderId: "474920163662",
  appId: "1:474920163662:web:7a324dd5a4ba4a33c3661f"
});
 
const messaging = firebase.messaging();
 
messaging.onBackgroundMessage((payload) => {
  const titulo = (payload.notification && payload.notification.title) || "Alerta Aula";
  const cuerpo = (payload.notification && payload.notification.body) || "Hay una alerta activa";
  self.registration.showNotification(titulo, {
    body: cuerpo,
    icon: "icon-192.png",
    vibrate: [250, 100, 250, 100, 250],
    tag: "alerta-aula",
    renotify: true
  });
});
 
const CACHE_NAME = "alerta-aula-v1";
const ARCHIVOS = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png"];
 
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARCHIVOS))
  );
  self.skipWaiting();
});
 
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
 
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});
 
