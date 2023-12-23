import codecs
from pathlib import Path

from selenium import webdriver
from selenium.webdriver.common.by import By

from txt2parquet import txt2parquet
from translator import translate_data


def get_txt(author):
    url = f"https://gallerix.ru/album/{author}"
    class_name = "a_dv1"

    driver = webdriver.Chrome()
    driver.get(url)
    driver.implicitly_wait(30)

    a = driver.find_elements(By.CLASS_NAME, class_name)

    with codecs.open(f"data/{author.replace(' ', '')}.txt", "w", "utf-16") as f:
        print(len(a))
        for j, i in enumerate(a):
            try:
                b = i.find_element(By.TAG_NAME, "img")
                src = b.get_attribute("src").removesuffix(".webp").split("/")
                alt = b.get_attribute("alt")
                author_index, picture_index = src[-2], src[-1]
                jpg = f"https://sr.gallerix.ru/_EX/{author_index}/{picture_index}.jpg"
                print(j, jpg, alt)
                f.write(f"{alt};{jpg}\n")
            except IndexError:
                print("IndexError", j)
            except Exception as e:
                print(e, j)


if __name__ == "__main__":
    author = "Surikov"

    Path("data").mkdir(parents=True, exist_ok=True)

    print("getting txt")
    get_txt(author)
    print("making parquet")
    txt2parquet(author)

    print("translating")
    try:

        translate_data(author)
    except Exception as e:
        print("Too much translations")
        print(e.args)
