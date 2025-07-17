#!/bin/bash
set -exo pipefail

SESSION="libphp"
PWD=$(pwd)

# Start a new session
tmux new-session -d -s $SESSION -c ${PWD}/libs/amazon-linux-2-v83

# Split the window into multiple panes
tmux split-window -h -t $SESSION:0.0 -c ${PWD}/libs/amazon-linux-2-v82
tmux split-window -v -t $SESSION:0.1 -c ${PWD}/libs/amazon-linux-2-v81
tmux split-window -v -t $SESSION:0.2 -c ${PWD}/libs/amazon-linux-2-v80

# Tidy up the panes
tmux select-layout -t $SESSION:0 tiled

# Focus on the first pane
tmux select-pane -t $SESSION:0.0

# Attach to session
tmux attach -t $SESSION
