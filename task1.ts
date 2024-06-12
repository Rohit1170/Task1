interface UserDevice {
  userId: string;
  deviceId: string;
  loggedInAt: Date;
  loggedOutAt: Date | null;
  lastSeenAt: Date;
}

function getMonthlyLoggedInAndActiveUsers(devices: UserDevice[], month: number, year: number): { loggedIn: number; active: number } {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);

  const loggedInUsers = new Set<string>();
  const activeUsers = new Set<string>();

  devices.forEach((device) => {
    if (
      (device.loggedInAt >= startDate && device.loggedInAt <= endDate) ||
      (device.loggedOutAt && device.loggedOutAt >= startDate && device.loggedOutAt <= endDate)
    ) {
      loggedInUsers.add(device.userId);
    }

    if (device.lastSeenAt >= startDate && device.lastSeenAt <= endDate) {
      activeUsers.add(device.userId);
    }
  });

  return { loggedIn: loggedInUsers.size, active: activeUsers.size };
}
