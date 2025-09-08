import pandas as pd
from pathlib import Path

dataDir = Path(__file__).parent / "data"
outputDir = Path(__file__).parent / "output"
outputDir.mkdir(exist_ok=True)

files = list(dataDir.glob("*.json"))
dfs = [pd.read_json(f) for f in files]
music = pd.concat(dfs, ignore_index=True)

music = music.rename(columns={
    "master_metadata_track_name": "track",
    "master_metadata_album_artist_name": "artist",
    "master_metadata_album_album_name": "album",
})

music = music.drop(columns=["ip_addr"])

music = music[music["ms_played"] > 0]
music["ts"] = pd.to_datetime(music["ts"])

if "episode_show_name" in music.columns:
    music = music[music["episode_show_name"].isna()]


# 1 - timeline (per day)
music["date"] = music["ts"].dt.date
timeline = music.groupby("date")["ms_played"].sum().reset_index()
timeline["hours_played"] = timeline["ms_played"] / 3_600_000
timeline.to_csv(outputDir / "timeline.csv", index=False)


# 2 - leaderboards 
artistLeaderboard = (
    music.groupby("artist")["ms_played"].sum().sort_values(ascending=False).reset_index()
)
artistLeaderboard["hours_played"] = artistLeaderboard["ms_played"] / 3_600_000
artistLeaderboard.to_csv(outputDir / "artistLeaderboard.csv", index=False)

trackLeaderboard = (
    music.groupby(["artist", "track"])["ms_played"]
    .sum()
    .sort_values(ascending=False)
    .reset_index()
)
trackLeaderboard["hours_played"] = trackLeaderboard["ms_played"] / 3_600_600
trackLeaderboard.to_csv(outputDir / "trackLeaderbaord.csv", index=False)


# 3 - taste evolution (yearly)
music["year"] = music["ts"].dt.year
tasteEvol = music.groupby(["year", "artist"])["ms_played"].sum().reset_index()
tasteEvol["hours_played"] = tasteEvol["ms_played"] / 3_600_000
tasteEvol.to_csv(outputDir / "tasteEvol.csv", index=False)


# 4 - listening share
listenShare = music.groupby("artist")["ms_played"].sum().reset_index()
listenShare["hours_played"] = listenShare["ms_played"] / 3_600_000
listenShare.to_csv(outputDir / "listenShare.csv", index=False)


# 5 - day + time heatmap
music["weekday"] = music["ts"].dt.day_name()
music["hour"] = music["ts"].dt.hour
dayTimeHeat = music.groupby(["weekday", "hour"])["ms_played"].sum().reset_index()
dayTimeHeat["hours_played"] = dayTimeHeat["ms_played"] / 3_600_000
dayTimeHeat.to_csv(outputDir / "dayTimeHeat.csv", index=False)


# 6 - cumulative hours
timelineSort = timeline.sort_values("date")
timelineSort["cumulative_hours"] = timelineSort["hours_played"].cumsum()
timelineSort.to_csv(outputDir / "cumulativeHours.csv", index=False)
