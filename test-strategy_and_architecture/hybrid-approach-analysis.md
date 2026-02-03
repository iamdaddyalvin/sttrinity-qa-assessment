# Hybrid Approach: Bypassing Login UI

## Problem
Tests are slow because every test logs in through the UI. Need to speed this up.

## What We Gain
- **Speed**: 60-80% faster tests (skip 3-5 second login each time)
- **Reliability**: Fewer flaky failures from login timing issues
- **Maintenance**: Login logic in one place, easier to update
- **Testing**: Can test different user roles easily

## What We Lose
- **Login UI Bugs**: Won't catch login page errors, CSS issues, or accessibility problems
- **Security Issues**: Might miss login-specific vulnerabilities
- **Session Problems**: Won't detect session expiration or logout issues
- **Complexity**: Need to maintain both approaches

## Balance Approach
- **Most tests**: Use programmatic login for speed
- **Few tests**: Keep some login UI tests for critical coverage
- **Monitoring**: Watch production login success rates
- **Schedule**: Run login UI tests daily, not every commit

## Bottom Line
Big speed gain with manageable risk. Keep just enough login UI testing to catch critical issues while using programmatic login for most scenarios.
