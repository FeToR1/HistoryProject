import googletrans
import pandas as pd

translator = googletrans.Translator()
translator.raise_Exception = True


def translate_data(author: str) -> None:
    df = pd.read_parquet(f"data/{author}.parquet", engine="fastparquet")
    df["author"] = df["author"].apply(lambda x: translator.translate(x, src="ru", dest="en").text)
    df["name"] = df["name"].apply(lambda x: translator.translate(x, src="ru", dest="en").text)
    df.to_parquet(f"data/{author}_tr.parquet")


if __name__ == "__main__":
    translate_data("Aivazovsky")
    d = pd.read_parquet("data/Aivazovsky.parquet", engine="fastparquet")
    print(d["name"].tolist())
