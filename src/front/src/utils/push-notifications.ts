export const displayPushNotification = (
  body = "Vous recevrez à présent les notifications",
  title = "Updev-Community"
) => {
  if ("serviceWorker" in navigator) {
    let options: NotificationOptions = {
      body,
      icon: "/logo.png",
      dir: "ltr",
      tag: "confirm-notification",
      renotify: true
    };

    navigator.serviceWorker.ready.then(swreg => {
      swreg.showNotification(title, options);
    });
  }
};
// @ts-ignore
function permissionQuery(result) {
  console.debug({ result });
  var newPrompt;

  if (result.state == "granted") {
    //  displayConfirmNotification();
  } else if (result.state == "prompt") {
    // we can ask the user
    newPrompt = Notification.requestPermission(result => {
      // console.log("user choice", result);
      if (result !== "granted") {
        alert("Veuillez activer les notifications");
      } else {
        displayPushNotification();
      }
    });
  } else if (result.state == "denied") {
    console.log("Permission " + result.state);
  }

  result.onchange = () => console.debug({ updatedPermission: result });

  return newPrompt || result;
}

export const handlePermission = () => {
  // Let's check if the browser supports notifications
  if ("Notification" in window) {
    navigator.permissions
      .query({ name: "notifications" })
      .then(permissionQuery)
      .catch(error => {
        // @ts-ignore
        console.log("error", error);
      });
  }
};
