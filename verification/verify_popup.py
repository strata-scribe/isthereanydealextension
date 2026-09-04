from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:4173")
    page.wait_for_timeout(500)

    # Take screenshot of the popup rendering
    page.screenshot(path="/app/verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/app/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()