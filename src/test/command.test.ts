import { expect } from 'chai';
import { Workbench, Notification, NotificationType, NotificationsCenter } from 'vscode-extension-tester';

describe('Hello World Example UI Tests', () => {
  let center: NotificationsCenter;
  let notification: Notification;

  before(async function(){
    this.timeout(25000);

    const workbench = new Workbench();
    await workbench.executeCommand('Hello World');

    center = await workbench.openNotificationsCenter();
    await center.getDriver().sleep(200);
    notification = (await center.getNotifications(NotificationType.Any))[0];
  });

  it('1. Check the notification text', async function() {
    const message = await notification.getMessage();
    expect(message).has.string('Hello World!');
  });

  it('2. Check the notification type', async function() {
    const type = await notification.getType();
    expect(type).equals(NotificationType.Info);
  });
});