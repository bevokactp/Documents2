from flask import Flask, render_template, redirect, url_for, session, request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
import json

app = Flask(__name__)
app.secret_key = "your_secret_key"

with open("config.json") as config_file:
    config_data = json.load(config_file)

CLIENT_ID = config_data["CLIENT ID"]
CLIENT_SECRET = config_data["CLIENT SECRET"]
YOUTUBE_API_KEY = config_data["YOUTUBE_API_KEY"]
REDIRECT_URIS = config_data["REDIRECT_URIS"]

flow = Flow.from_client_config(
    {
        "web": {
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "redirect_uris": [REDIRECT_URIS],
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
        }
    },
    scopes=["https://www.googleapis.com/auth/youtube.readonly"],
)


def credentials_to_dict(credentials):
    return {
        "token": credentials.token,
        "refresh_token": credentials.refresh_token,
        "token_uri": credentials.token_uri,
        "client_id": credentials.client_id,
        "client_secret": credentials.client_secret,
        "scopes": credentials.scopes,
    }


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/subscriptions")
def subscriptions():
    if "credentials" not in session:
        return redirect(url_for("authorize"))

    credentials = Credentials(**session["credentials"])
    youtube = build("youtube", "v3", credentials=credentials)

    subscriptions = (
        youtube.subscriptions().list(part="snippet", mine=True, maxResults=10).execute()
    )

    return render_template("subscriptions.html", subscriptions=subscriptions["items"])


@app.route("/oauth2callback")
def oauth2callback():
    flow.fetch_token(authorization_response=request.url)
    credentials = flow.credentials
    session["credentials"] = credentials_to_dict(credentials)
    return redirect(url_for("index"))


@app.route("/authorize")
def authorize():
    authorization_url, state = flow.authorization_url(
        access_type="offline", include_granted_scopes="true"
    )
    session["state"] = state
    return redirect(authorization_url)


@app.route("/search", methods=["GET"])
def search():
    if "credentials" not in session:
        return redirect(url_for("authorize"))

    query = request.args.get("query")
    sort_by = request.args.get("sort_by", "date")  # Default sorting by date
    filter_channel = request.args.get("filter_channel")
    filter_date = request.args.get("filter_date")
    filter_views = request.args.get("filter_views")
    filter_duration = request.args.get("filter_duration")

    if not query:
        return redirect(url_for("index"))

    credentials = Credentials(**session["credentials"])
    youtube = build("youtube", "v3", credentials=credentials)

    search_response = (
        youtube.search()
        .list(q=query, part="snippet", type="video", maxResults=50)
        .execute()
    )

    videos = search_response["items"]

    # Additional filtering and sorting logic can be added here
    if filter_channel:
        videos = [
            video
            for video in videos
            if video["snippet"]["channelTitle"] == filter_channel
        ]
    if filter_date:
        videos = [
            video
            for video in videos
            if video["snippet"]["publishedAt"].startswith(filter_date)
        ]
    if filter_views:
        # View count filtering is more complex and might require additional API calls
        pass
    if filter_duration:
        # Duration filtering is more complex and might require additional API calls
        pass

    # Sorting by field
    if sort_by == "date":
        videos.sort(key=lambda x: x["snippet"]["publishedAt"], reverse=True)
    elif sort_by == "duration":
        # Assuming you have the duration in the video details, which requires additional API calls
        pass

    return render_template("search_results.html", results=videos)


if __name__ == "__main__":
    app.run("localhost", 5000, debug=True)
