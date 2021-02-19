const BASE_URL = "https://cattube-env.eba-wbpixdq6.us-east-1.elasticbeanstalk.com";

function createComment(videoId, userId, comment) {
  return fetch(`${BASE_URL}/addComment/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      videoId: videoId,
      author: userId,
      content: comment,
    }),
  }).then((res) => res.json());
}

const apiService = {
  getComments(video) {
    return fetch(`${BASE_URL}/${video.id}/comments`, {
      headers: {
        Accept: "application/json",
      },
    }).then((res) => res.json());
  },

  getUser(id) {
    return fetch(`${BASE_URL}/user/${id}`).then((res) => res.json());
  },

  postComment(video, userId, comment) {
    // See if video exists in DB
    return fetch(`${BASE_URL}/${video.id}`)
      .then((res) => res.json())
      .then((videoFound) => {
        if (videoFound) {
          // Post new comment
          return createComment(video.id, userId, comment);
        } else {
          // Create video first, then post comment
          return fetch(`${BASE_URL}/addVideo/`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              videoId: video.id,
              videoTitle: video.title,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              // Post new comment
              console.log(data);
              return createComment(video.id, userId, comment);
            });
        }
      });
  },

  updateComment(commentId, author, videoId, content, time) {
    return fetch(`${BASE_URL}/updateComment`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentId: commentId,
        author: author,
        videoId: videoId,
        content: content,
        time: time,
      }),
    }).then((res) => res.json());
  },

  deleteComment(id) {
    return fetch(`${BASE_URL}/deleteComment/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
  },
};

export default apiService;
