# analyzer.py
import pandas as pd

def behaviour_summary(file_path="data/interactions.csv"):
    """
    Displays a quick summary of user behaviour
    from the interactions CSV.
    """
    try:
        df = pd.read_csv(file_path, parse_dates=["timestamp"])
    except FileNotFoundError:
        print("No interaction file found.")
        return

    if df.empty:
        print("No interactions recorded yet.")
        return

    print("\n=== USER BEHAVIOUR SUMMARY ===")
    print("Total Events:", len(df))
    print("\nEvents per User:\n", df.groupby("user_id")["event"].count())
    print("\nEvents per Product:\n", df.groupby("product_id")["event"].count())
    print("\nEvent Type Distribution:\n", df["event"].value_counts())

    # Identify most active user
    most_active = df["user_id"].value_counts().idxmax()
    print(f"\nMost Active User: {most_active}")
