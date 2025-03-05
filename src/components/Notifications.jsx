const Notifications = ({ notificationLoader }) => {
  const { data: notifications, isLoading } = notificationLoader();

//   if (isLoading) return <p>Loading notifications...</p>;

  return (
    <div className="notifications">
      <h3>Notifications</h3>
      <ul>
        {isLoading && <p>Loading notifications...</p>}
        {notifications && notifications.map((notification, index) => (
          <li key={index}>
            {notification.title} 
            <br />
            {notification.description}
        </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
