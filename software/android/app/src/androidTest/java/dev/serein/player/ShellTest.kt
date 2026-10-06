package dev.serein.player

import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.assertIsSelected
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.test.ext.junit.runners.AndroidJUnit4
import org.junit.Assume.assumeTrue
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

/** Actual UI/device checks for the shell; they don't claim music playback exists. */
@RunWith(AndroidJUnit4::class)
class ShellTest {
    @get:Rule val compose = createAndroidComposeRule<MainActivity>()

    @Test fun navigationShowsEmptyLibraryAndUnavailableDeck() {
        compose.onNodeWithTag("open-library").performClick()
        compose.onNodeWithTag("library-empty").assertIsDisplayed()
        compose.onNodeWithTag("library-Setlists").performClick()
        compose.onNodeWithText("No setlists yet").assertIsDisplayed()
        compose.onNodeWithTag("nav-Deck").performClick()
        compose.onNodeWithText("Deck connection isn’t ready yet.").assertIsDisplayed()
        compose.onNodeWithTag("nav-Home").performClick()
        compose.onNodeWithTag("open-spotify").assertIsDisplayed()
    }

    @Test fun recreationKeepsLibraryTab() {
        compose.onNodeWithTag("nav-Library").performClick()
        compose.onNodeWithTag("library-Playlists").performClick()
        compose.activityRule.scenario.recreate()
        compose.onNodeWithTag("nav-Library").assertIsSelected()
        compose.onNodeWithTag("library-Playlists").assertIsSelected()
        compose.onNodeWithText("No playlists yet").assertIsDisplayed()
    }
    @Test fun absentSpotifyShowsDismissibleMessage() {
        assumeTrue(compose.activity.packageManager.getLaunchIntentForPackage("com.spotify.music") == null)
        compose.onNodeWithTag("open-spotify").performClick()
        compose.onNodeWithText("Spotify isn’t installed").assertIsDisplayed()
        compose.onNodeWithText("OK").performClick()
        compose.onNodeWithTag("open-library").assertIsDisplayed()
    }

}
