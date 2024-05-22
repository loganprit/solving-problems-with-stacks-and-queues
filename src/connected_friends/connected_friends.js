const Queue = require("../lib/queue");

const connected = (G, s, r) => {
  // 1. If G is empty (has no keys), return false.
  if (Object.keys(G).length === 0) {
    return false;
  }

  // 2. If s is equal to r, return true.
  if (s === r) {
    return true;
  }

  // 3. Initialize a new array, enqueued, that contains s.
  let enqueued = [s];

  // 4. Initialize a new empty queue named discovered.
  let discovered = new Queue();

  // 5. Enqueue s.
  discovered.enqueue(s);

  // 6. While discovered isn't empty, do the following:
  while (discovered.first !== null) {
    // A. Dequeue a value from discovered and name it user.
    let user = discovered.dequeue();

    // B. For each friend followedUser in G[user], do the following:
    for (let followedUser of G[user] || []) {
      // i. If followedUser is equal to r, return true.
      if (followedUser === r) {
        return true;
      }

      // ii. If enqueued doesn't include followedUser, do the following:
      if (!enqueued.includes(followedUser)) {
        // a. Add followedUser to enqueued.
        enqueued.push(followedUser);

        // b. Enqueue friend to discovered.
        discovered.enqueue(followedUser);
      }
    }
  }

  // 7. Return false.
  return false;
};

module.exports = connected;
