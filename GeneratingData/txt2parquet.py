import codecs
import requests
import pandas as pd
from PIL import Image
from io import BytesIO
from threading import Thread

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 "
                  "Safari/537.36"}

listt = []
max_threads = 10


def do_request(urls, names):
    listtt = []
    for i, url in enumerate(urls):
        if url is None:
            continue
        r = requests.get(url, headers=headers)
        listtt.append([names[i], r.content])
    listt.extend(listtt)


def get_requests(df):
    urls = df["url"].tolist()
    names = df["name"].tolist()
    threads = []
    for i in range(0, len(urls), max_threads):
        threads.append(Thread(target=do_request, args=(urls[i:i + max_threads], names[i:i + max_threads],)))
    for thread in threads:
        thread.start()
    for thread in threads:
        thread.join()


def txt2parquet(author: str) -> None:
    with codecs.open(f"data/{author.replace(' ', '')}.txt", "r", "utf-16") as file:
        a = file.read().split("\n")
    a = [i.split(";") for i in a]
    a.pop(-1)  # always empty string at the end
    print(a)
    df = pd.DataFrame(a, columns=["name", "url"])
    get_requests(df)
    df = pd.DataFrame()
    author_name = listt[0][0].split(",")[-1]
    df["author"] = [author_name for _ in range(len(listt))]
    df["name"] = [i[0].removesuffix("," + author_name) for i in listt]
    df["name"] = df["name"].apply(lambda x: x[:x.rfind(".")])
    df["bytes"] = [i[1] for i in listt]

    df.to_parquet(f"data/{author}.parquet")


if __name__ == "__main__":

    txt2parquet("Aivazovsky")

    # read from parquet
    b = pd.read_parquet("data/Aivazovsky.parquet", engine="fastparquet")
    print(b)

    Image.open(BytesIO(b["bytes"][10])).show()
    print(b["name"][10])
