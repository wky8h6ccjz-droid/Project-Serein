package dev.serein.player

import android.content.ActivityNotFoundException
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.sizeIn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent { SereinShell(::openSpotify) }
    }

    private fun openSpotify(): Boolean {
        val launch = packageManager.getLaunchIntentForPackage("com.spotify.music") ?: return false
        return try { startActivity(launch); true }
        catch (_: ActivityNotFoundException) { false }
        catch (_: SecurityException) { false }
    }
}

private val sereinColors = darkColorScheme(
    primary = Color(0xFFD4BFE8), onPrimary = Color(0xFF221B2B),
    background = Color(0xFF141218), surface = Color(0xFF1C1922),
    onBackground = Color(0xFFEEEBF2), onSurface = Color(0xFFEEEBF2),
    surfaceVariant = Color(0xFF28212F), onSurfaceVariant = Color(0xFFB8B3C1)
)

@Composable
internal fun SereinShell(openSpotify: () -> Boolean) {
    MaterialTheme(colorScheme = sereinColors) {
        var page by rememberSaveable { mutableStateOf("Home") }
        var libraryTab by rememberSaveable { mutableIntStateOf(0) }
        var spotifyMissing by rememberSaveable { mutableStateOf(false) }
        BackHandler(enabled = page != "Home") { page = "Home" }
        Scaffold(
            bottomBar = {
                NavigationBar(containerColor = sereinColors.background) {
                    listOf("Home" to "⌂", "Library" to "♫", "Deck" to "⇄").forEach { (title, symbol) ->
                        NavigationBarItem(
                            selected = page == title, onClick = { page = title },
                            icon = { Text(symbol, fontSize = 23.sp) }, label = { Text(title) },
                            modifier = Modifier.testTag("nav-$title")
                        )
                    }
                }
            }
        ) { insets ->
            Column(
                modifier = Modifier.fillMaxSize().padding(insets).verticalScroll(rememberScrollState())
                    .padding(horizontal = 20.dp, vertical = 24.dp),
                verticalArrangement = Arrangement.spacedBy(22.dp)
            ) {
                Text("Serein", style = MaterialTheme.typography.titleLarge)
                when (page) {
                    "Home" -> {
                        HomeCard("Spotify", "Open Spotify", Color(0xFF19352A), "open-spotify") {
                            spotifyMissing = !openSpotify()
                        }
                        HomeCard("Library", "Saved music", Color(0xFF30253E), "open-library") { page = "Library" }
                    }
                    "Library" -> {
                        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                            Text("Library", style = MaterialTheme.typography.headlineMedium)
                            OutlinedButton(onClick = {}, enabled = false) { Text("Add songs") }
                        }
                        val tabs = listOf("Songs", "Playlists", "Setlists")
                        TabRow(selectedTabIndex = libraryTab, containerColor = Color.Transparent) {
                            tabs.forEachIndexed { index, title ->
                                Tab(selected = libraryTab == index, onClick = { libraryTab = index },
                                    text = { Text(title) }, modifier = Modifier.testTag("library-$title"))
                            }
                        }
                        Text(if (libraryTab == 0) "No songs yet" else "No ${tabs[libraryTab].lowercase()} yet",
                            color = sereinColors.onSurfaceVariant, modifier = Modifier.testTag("library-empty"))
                    }
                    "Deck" -> {
                        Text("Deck", style = MaterialTheme.typography.headlineMedium)
                        Text("Deck connection isn’t ready yet.", color = sereinColors.onSurfaceVariant)
                    }
                }
            }
        }
        if (spotifyMissing) {
            AlertDialog(onDismissRequest = { spotifyMissing = false },
                title = { Text("Spotify isn’t installed") },
                confirmButton = { TextButton(onClick = { spotifyMissing = false }) { Text("OK") } })
        }
    }
}

@Composable
private fun HomeCard(title: String, detail: String, color: Color, tag: String, onClick: () -> Unit) {
    Card(onClick = onClick, colors = CardDefaults.cardColors(containerColor = color),
        modifier = Modifier.fillMaxWidth().sizeIn(minHeight = 120.dp).testTag(tag)) {
        Column(Modifier.padding(24.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
            Text(title, style = MaterialTheme.typography.titleLarge)
            Text(detail, style = MaterialTheme.typography.bodyMedium, color = Color(0xFFB8B3C1))
        }
    }
}
