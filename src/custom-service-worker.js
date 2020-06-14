importScripts('./ngsw-worker.js');

(function () {
  'use strict';

  self.addEventListener('notificationclick', (event) => {
    console.log("This is custom service worker notificationclick method.");
    console.log('Notification details: ', event.notification);
    event.waitUntil(clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then((clientList) => {
      var client = null
      for (var i = 0; i < clientList.length; i++) {
        client = clientList[i];
        if (client.url == '/')
          break;
      }
      if (client) {
        return client.focus();
      } else {
        if (event.notification.data.teamId) {
          return clients.openWindow('/teams/' + event.notification.data.teamId)
        }
        return clients.openWindow('/');
      }
    }));
  });
}
());
