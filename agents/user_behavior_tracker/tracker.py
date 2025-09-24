# tracker.py
import pandas as pd
from pathlib import Path
from datetime import datetime

class UserBehaviourTracker:
    """
    Tracks user interactions with products:
      - 'view'     : when a user views a product page
      - 'click'    : when a user clicks or adds to cart/wishlist
      - 'purchase' : when a user purchases a product
    Data is stored in a CSV file for easy analytics.
    """

    def __init__(self, file_path="data/interactions.csv"):
        self.file_path = Path(file_path)
        # Ensure directory and file exist
        if not self.file_path.exists():
            self.file_path.parent.mkdir(parents=True, exist_ok=True)
            pd.DataFrame(columns=["user_id", "product_id", "event", "timestamp"])\
              .to_csv(self.file_path, index=False)

    def log_event(self, user_id: str, product_id: int, event: str):
        """
        Records a single user action.
        :param user_id: unique user identifier
        :param product_id: product identifier
        :param event: one of {'view','click','purchase'}
        """
        allowed = {"view", "click", "purchase"}
        if event not in allowed:
            raise ValueError(f"event must be one of {allowed}")

        # Read, append, and save
        df = pd.read_csv(self.file_path)
        df.loc[len(df)] = [
            user_id,
            product_id,
            event,
            datetime.utcnow().isoformat()
        ]
        df.to_csv(self.file_path, index=False)
        print(f"[{datetime.now().strftime('%H:%M:%S')}] {user_id} {event} -> {product_id}")
