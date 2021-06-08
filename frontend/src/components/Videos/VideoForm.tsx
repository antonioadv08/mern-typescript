import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { Video } from "./Video";
import * as videoService from "./VideoService";
import { toast } from "react-toastify";

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface Params {
  id: string;
}

export const VideoForm = () => {
  const history = useHistory();
  const params = useParams<Params>();

  const initialState = { title: "", url: "", description: "" };

  const [video, setVideo] = useState<Video>(initialState);

  const handleInputChange = (e: InputChange) => {
    setVideo({ ...video, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!params.id) {
      await videoService.createVideo(video);
      toast.success("New video added");
      setVideo(initialState);
    } else {
      await videoService.updateVideo(params.id, video);
      console.log("asdasd")
    }

    history.push("/");
  };

  const getVideo = async (id: string) => {
    const res = await videoService.getVideo(id);
    const { title, description, url } = res.data;

    setVideo({ title, description, url });
  };

  useEffect(() => {
    if (params.id) {
      getVideo(params.id);
    }
  }, []);

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="card">
          <div className="card-body">
            <h3>New Video</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <input
                  type="text"
                  name="title"
                  placeholder="Write a title for this video"
                  className="form-control"
                  onChange={handleInputChange}
                  autoFocus
                  value={video.title}
                ></input>
              </div>
              <div className="form-group mb-3">
                <input
                  type="text"
                  name="url"
                  placeholder="https://somesite.com"
                  className="form-control"
                  onChange={handleInputChange}
                  value={video.url}
                ></input>
              </div>
              <div className="form-group mb-3">
                <textarea
                  name="description"
                  placeholder="write a description"
                  className="form-control"
                  rows={3}
                  onChange={handleInputChange}
                  value={video.description}
                ></textarea>
              </div>
              {params.id ? (
                <button className="btn btn-primary">Update Video</button>
              ) : (
                <button className="btn btn-primary">Create Video</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
