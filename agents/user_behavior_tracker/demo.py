# demo.py
from tracker import UserBehaviourTracker
from analyzer import behaviour_summary

def run_demo():
    tracker = UserBehaviourTracker()

    # Simulate user interactions
    tracker.log_event("user_001", 201, "view")
    tracker.log_event("user_001", 202, "click")
    tracker.log_event("user_001", 202, "purchase")
    tracker.log_event("user_002", 203, "view")
    tracker.log_event("user_002", 201, "click")

    # Show a behaviour summary
    behaviour_summary()

if __name__ == "__main__":
    run_demo()
